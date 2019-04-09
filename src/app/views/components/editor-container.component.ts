import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import MediumEditor from 'medium-editor';
declare var $;

@Component({
    selector: 'app-editor-container',
    templateUrl: './editor-container.component.html',
    styleUrls: ['./editor-container.component.scss']
})
export class EditorContainerComponent implements OnInit, AfterViewInit {

    @ViewChild('container') container: ElementRef;
    mediumEditor: any;

    content = '<p></p>' +
        '<p><b>* Invite readers to follow the broadcast programs of Vtv world on ' +
        '<a href="https://beta.vtvworld.vtv.vn" target="_blank" title="VTV World" rel="nofollow">VTV World !</a>' +
        '</b></p>';

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const element = this.container.nativeElement;
        this.mediumEditor = new MediumEditor(element, {
            toolbar: {
                allowMultiParagraphSelection: true,
                buttons: [
                    {
                        name: 'bold',
                        attrs: {
                            'title': 'In đậm'
                        }
                    },
                    {
                        name: 'italic',
                        attrs: {
                            'title': 'In nghiêng'
                        }
                    },
                    {
                        name: 'underline',
                        attrs: {
                            'title': 'Gạch chân'
                        }
                    },
                    {
                        name: 'anchor',
                        contentDefault: '<b class=" fa fa-link"></b>',
                        attrs: {
                            'title': 'Chèn link'
                        }
                    },
                    {
                        name: 'justifyLeft',
                        contentDefault: '<b class="fa fa-align-left"></b>',
                        attrs: {
                            'title': 'Căn trái'
                        }
                    },
                    {
                        name: 'justifyCenter',
                        contentDefault: '<b class="fa fa-align-center"></b>',
                        attrs: {
                            'title': 'Căn giữa'
                        }
                    },
                    {
                        name: 'justifyRight',
                        contentDefault: '<b class="fa fa-align-right"></b>',
                        attrs: {
                            'title': 'Căn phải'
                        }
                    },
                    {
                        name: 'justifyFull',
                        contentDefault: '<b class="fa fa-align-justify"></b>',
                        attrs: {
                            'title': 'Căn đều hai bên'
                        }
                    }
                ],
                diffLeft: 0,
                diffTop: -10,
                firstButtonClass: 'medium-editor-button-first',
                lastButtonClass: 'medium-editor-button-last',
                relativeContainer: null,
                standardizeSelectionStart: false,
                static: false,
                align: 'center',
                sticky: false,
                updateOnEmptySelection: false
            },
            anchor: {
                placeholderText: 'Dán hoặc nhập liên kết',
            }
        });
        $(element).mediumInsert({
            'editor': this.mediumEditor,
            'images': true
        });
    }


}
