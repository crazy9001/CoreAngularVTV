import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment.prod';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {Location} from '@angular/common';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
	selector: 'app-video-edit',
	templateUrl: './video-edit.component.html',
})
export class VideoEditComponent implements OnInit, OnDestroy {
	environment: any;
	id: number;
	role: string;
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
		storage_id: '',
		status: '',
		type: ''
	};
	editVideoForm: FormGroup;
	categories: Array<ICategory>;
	private sub: any;
	public storageThumbnails;

	constructor(
		private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
		private confirmationDialogService: ConfirmationDialogService,
		private route: ActivatedRoute,
		private videoService: VideoService,
		private categoryService: CategoryService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private authService: AuthService,
		private _location: Location
	) {
		this.environment = environment;
	}

	ngOnInit() {
		this.role = this.authService.getRoleUser();
		this.getCategory();
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id'];
		});
		this.getDetailVideo();
		this.createForm();
	}

	/* Get detail video by id */
	getDetailVideo() {
		this.ng4LoadingSpinnerService.show();
		this.videoService.getDetailVideoById(this.id).then(video => {
			console.log(video);
			this.video.id = video.id;
			this.video.content = video.content.Content;
			this.video.category_id = video.category.id;
			this.video.title = video.Title;
			this.video.description = video.Description;
			this.video.publish_at = video.element.PublishAt;
			this.video.source = video.Source;
			this.video.seo_title = video.seo.MetaTitle;
			this.video.seo_description = video.seo.MetaDescription;
			this.video.seo_keywords = video.seo.MetaKeyWords;
			this.video.thumbnails = video.Thumbnails;
			this.video.status = video.Status;
			this.video.type = video.Type;
			this.storageThumbnails = video.storage.thumbnails;
			this.video.storage_id = video.storage ? video.storage.id : 0;
			this.ng4LoadingSpinnerService.hide();
		});
	}

	/* Create form and validate */
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
			categories: [null, [Validators.required]],
			type: ['', '']
		});
	}

	/* Get default category */
	getCategory() {
		this.categoryService.getVideoCategoryByUser().then(category => {
			this.categories = category;
		});
	}

	/* Output video from media video */
	eventReceiveVideoInsert($event) {
		this.video.content = $event.data.path;
		this.video.type = $event.type;
		this.storageThumbnails = $event.data.thumbnails;
		this.video.thumbnails = $event.data.thumbnails[0];
		if ($event.type === 'video') {
			this.video.storage_id = $event.data.id;
		} else {
			this.video.storage_id = 0;
		}
	}

	/* Update video */
	eventUpdateVideo() {
		//console.log(this.editVideoForm.value);
		this.ng4LoadingSpinnerService.show();
		this.videoService.update(this.editVideoForm.value).subscribe(res => {
			this.notificationService.showSuccess('Đã cập nhật dữ liệu', 'Success');
			this.ng4LoadingSpinnerService.hide();
		});
	}

	/* Update video to editor */
	eventVideoToEditor(id: number) {

		this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên biên tập ?')
			.then((confirmed) => {
				if (confirmed) {
					this.videoService.changeVideoToEditor(id).then(res => {
						this.notificationService.showSuccess('Gửi biên tập', 'Success');
						this.backRoute();
					}, (errorRes: HttpErrorResponse) => {
					});
				}
			})
			.catch(() => {
			});
	}

	/* Update video to publish */
	eventVideoToPublish(id: number) {

		this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên xuất bản ?')
			.then((confirmed) => {
				if (confirmed) {
					this.videoService.changeVideoToPublish(id).then(res => {
						this.notificationService.showSuccess('Gửi xuất bản', 'Success');
						this.backRoute();
					}, (errorRes: HttpErrorResponse) => {
					});
				}
			})
			.catch(() => {
			});
	}

	/* Publish video */
	eventPublishVideo(id: number) {

		this.confirmationDialogService.confirm('Xác nhận', 'Xuất bản video ?')
			.then((confirmed) => {
				if (confirmed) {
					this.videoService.publishVideo(id).then(res => {
						this.notificationService.showSuccess('Đã xuất bản', 'Success');
						this.backRoute();
					}, (errorRes: HttpErrorResponse) => {
					});
				}
			})
			.catch(() => {
			});
	}

	/* Remove video */
	eventRemoveVideo(id: number) {
		this.confirmationDialogService.confirm('Xác nhận', 'Gỡ video xuống ?')
			.then((confirmed) => {
				if (confirmed) {
					this.videoService.removeVideo(id).then(res => {
						this.notificationService.showSuccess('Đã gỡ video', 'Success');
						this.backRoute();
					}, (errorRes: HttpErrorResponse) => {
					});
				}
			})
			.catch(() => {
			});
	}

	backRoute() {
		this._location.back();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
