import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {LogFactory} from "../../shared/log.factory";
import * as _ from "lodash";

@Injectable()
export class PostsService {

  constructor(private http: Http,
              private logFactory: LogFactory) {
    let svc = this;
    svc.preLoadToCache();
  }

  private logger = this.logFactory.getLog(PostsService.name);
  private datasource = environment.datasource;

  private preLoadToCache() {
    let svc = this;
    svc.http.get(svc.datasource.posts).share();
    svc.http.get(svc.datasource.categories).share();
    svc.http.get(svc.datasource.tags).share();
  }

  public getPostList() {
    let svc = this;
    svc.logger.info('Load Posts from:', svc.datasource.posts);
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        return response.json();
      });
  }

  public getFilteredPostList() {
    let svc = this;
    svc.logger.info('Load Posts from:', svc.datasource.posts);
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let allPostData = response.json();
        //check if need filter
        return svc.filterPosts(allPostData);
      });
  }

  public getCategoryList() {
    let svc = this;
    svc.logger.info('Load Categories from:', svc.datasource.categories);
    return svc.http.get(svc.datasource.categories)
      .map(function (response) {
        return response.json();
      });
  }

  public getTagList() {
    let svc = this;
    svc.logger.info('Load Tags from:', svc.datasource.tags);
    return svc.http.get(svc.datasource.tags)
      .map(function (response) {
        return response.json();
      });
  }


  public queryByCategoryName(categoryName: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();

        let queryResultList = [];

        _.each(postList, function (post) {
          if (_.isEqual(post.category, categoryName)) {
            queryResultList.push(post);
          }
        });
        return queryResultList;
      });
  }

  public queryByTagName(tagName: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();

        let queryResultList = [];

        _.each(postList, function (post) {
          if (_.indexOf(post.tags, tagName) > -1) {
            queryResultList.push(post);
          }
        });
        return queryResultList;
      });
  }

  public getPost(postLink: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();
        return _.find(postList, {
          link: postLink
        });
      });
  }

  private filterPosts(postList) {
    let svc = this;
    let filterTags = [];
    let filterCategories = [];
    if (environment.blog.categories.filter) {
      filterCategories = environment.blog.categories.hidden;
    }
    if (environment.blog.tags.filter) {
      filterTags = environment.blog.tags.hidden;
    }


    let filteredPostList = _.filter(postList, function (post: any) {
      let filterFlag = false;

      if (post.category) {
        if (_.indexOf(filterCategories, post.category) > -1) {
          filterFlag = true;
        }
      }

      if (post.tags) {
        _.each(post.tags, function (tag) {
          if (_.indexOf(filterTags, tag) > -1) {
            filterFlag = true;
          }
        });
      }

      return !filterFlag;
    });

    svc.logger.info('Filtered Posts:', filteredPostList.length);
    return filteredPostList;
  }
}
