import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default class SwaggerDocumentateRoutesBuilder {
  private title: string;
  private description: string;
  private version: string;

  setTitle(title: string): SwaggerDocumentateRoutesBuilder {
    this.title = title;
    return this;
  }

  setDescription(description: string): SwaggerDocumentateRoutesBuilder {
    this.description = description;
    return this;
  }

  setVersion(version: string): SwaggerDocumentateRoutesBuilder {
    this.version = version;
    return this;
  }

  build(app: INestApplication, path: string) {
    const config = new DocumentBuilder()
      .setTitle(this.title || 'Weather API')
      .setDescription(this.description || 'Weather API Documentation')
      .setVersion(this.version || '1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
  }
}
