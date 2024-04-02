import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constants';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(signUpInput: SignUpDto) {
    const password = await argon.hash(signUpInput.password);

    const user = await this.prisma.user.create({
      data: { email: signUpInput.email, name: signUpInput.name, password },
    });

    const { accessToken, refreshToken } = await this.createToken(user);

    // await this.updateRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async signIn(signInInput: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await argon.verify(
      user.password,
      signInInput.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await this.createToken(user);

    // await this.updateRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async createToken(user: User) {
    const payload = {
      email: user.email,
      userId: user.id,
      roles: user.role.toLowerCase(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload),
    };
  }

  // async updateRefreshToken(user: User, refreshToken: string) {
  //   const hashedRefreshToken = await argon.hash(refreshToken);

  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { refreshToken: hashedRefreshToken },
  //   });
  // }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
