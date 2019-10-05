import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import {
  lookupMarkdownFiles,
  lookupImagesInMarkdownFile,
  copyImagesInMarkdown,
  isImageHosting,
  createArticleContext
} from '@blog/article-tools';

@Injectable()
export class ArticleService implements OnModuleInit {
  private readonly logger = new Logger(ArticleService.name);
  private postsFiles: string[];
  private postsContexts;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.logger.log(`Article Service inited with config.version: ${this.config.version}`);
    this.buildPostsData();
  }

  buildPostsData() {
    this.lookupPosts();
    this.copyPostsAssets();
    this.createArticleContexts();
  }

  lookupPosts() {
    const postsFiles = lookupMarkdownFiles(this.config.sources.posts);
    this.logger.log(`Load ${postsFiles.length} posts from ${this.config.sources.posts}`);
    this.postsFiles = postsFiles;
  }

  copyPostsAssets() {
    this.postsFiles.forEach((postFile) => {
      const relativeImages = lookupImagesInMarkdownFile(postFile).filter((imagePath) => !isImageHosting(imagePath));
      this.logger.log(`Copying posts assets from post: ${postFile} to  ${this.config.dirs.posts}`);
      copyImagesInMarkdown(postFile, relativeImages, this.config.sources.posts, this.config.dirs.posts);
    });
  }

  createArticleContexts() {
    this.postsContexts = this.postsFiles.map((postFile) => {
      return createArticleContext(postFile);
    });
  }

  get contexts() {
    return this.postsContexts;
  }
}
