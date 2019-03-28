import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import MediumEditor from 'medium-editor';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
})
export class PostCreateComponent implements OnInit, AfterViewInit {
    @ViewChild('container') container: ElementRef;

    ngAfterViewInit() {
        const element = this.container.nativeElement;
        const editor = new MediumEditor(element);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
