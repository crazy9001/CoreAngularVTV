import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VideoService} from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment.prod';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
})
export class VideoEditComponent implements OnInit, OnDestroy {
  environment: any;
  id: number;
  video = {
    id: '',
    content: '',
    title: '',
    description: '',
    publish_at: '',
    source: '',
    highlight: '',
    seo_title: '',
    seo_keywords: '',
    seo_description: '',
    thumbnails: '',
    category_id: '',
    storage_id: ''
  };
  editVideoForm: FormGroup;
  categories: Array<ICategory>;
  private sub: any;
  public thumbnails;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.environment = environment;
  }

  ngOnInit() {
    this.getCategory();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getDetailVideo();
    this.createForm();
  }
  getDetailVideo() {
    this.videoService.getDetailVideoById(this.id).then(video => {
      this.video.id = video.id;
      this.video.content = video.content.content;
      this.video.category_id = video.category.id;
      this.video.title = video.title;
      this.video.description = video.description;
      this.video.publish_at = video.element.publish_at;
      this.video.source = video.source;
      this.video.highlight = video.highlight;
      this.video.seo_title = video.seo.seo_title;
      this.video.seo_description = video.seo.seo_description;
      this.video.seo_keywords = video.seo.seo_keywords;
      this.video.thumbnails = video.thumbnails;
      this.video.storage_id = video.storage[0].pivot.storage_id;
      this.thumbnails = Object.keys(video.storage[0].thumbnails).map(key => ({type: key, value: video.storage[0].thumbnails[key]}));
    });
  }
  createForm() {
    this.editVideoForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      publish_at: [null, null],
      sub_category: [null, null],
      thumbnails: [null, [Validators.required]],
      tags: [null, null],
      source: [null, null],
      content: [null, [Validators.required]],
      storage_id: ['', null],
      seo_title: ['', null],
      seo_keywords: ['', null],
      seo_description: ['', null],
      highlight: ['', null],
      category_id: [null, null]
    });
  }
  getCategory() {
    this.categoryService.getVideoCategoryByUser().then(category => {
      this.categories = category;
    });
  }
  eventReceiveVideoInsert($event) {
    this.video.content = $event.path;
    this.video.storage_id = $event.id;
    this.thumbnails = Object.keys($event.thumbnails).map(key => ({type: key, value: $event.thumbnails[key]}));
  }
  eventUpdateVideo() {
    console.log(this.editVideoForm.value);
    this.videoService.update(this.editVideoForm.value).subscribe(res => {
      this.notificationService.showSuccess('Đã cập nhật dữ liệu', 'Success');
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
