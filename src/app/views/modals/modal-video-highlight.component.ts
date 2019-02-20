import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
	selector: 'app-modal-video-highlight',
	templateUrl: './modal-video-highlight.component.html',
})
export class ModalVideoHighlightComponent implements OnInit {
	@ViewChild('videoHighlightModal') public videoHighlightModal: ModalDirective;
	constructor() {
	}

	ngOnInit() {
	}

	show() {
		this.videoHighlightModal.show();
	}

	hide() {
		this.videoHighlightModal.hide();
	}

}
