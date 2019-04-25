import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, SecurityContext, OnChanges} from '@angular/core';
import MediumEditor from 'medium-editor';
import {DomSanitizer} from '@angular/platform-browser';
import {PlayerService} from '../../services/player.service';
declare var $;

@Component({
    selector: 'app-editor-container',
    templateUrl: './editor-container.component.html',
    styleUrls: ['./editor-container.component.scss']
})

export class EditorContainerComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('container') container: ElementRef;
    @Input() contentEditor: string;
    contentTrustHtml: any;
    mediumEditor: any;

    constructor(
        private sanitizer: DomSanitizer,
        private playerService: PlayerService
    ) {

    }

    ngOnInit() {
    }

    ngOnChanges() {
        const _this = this;
        this.contentTrustHtml = this.sanitizer.bypassSecurityTrustHtml(this.contentEditor);
        $(document).ready(function() {
            $('.VCSortableInPreviewMode').each(function (index) {
                const $this = $(this);
                const type = $this.attr('type');
                if (typeof (type) !== 'undefined') {
                    switch (type.toLowerCase()) {
                        case 'videostream' :
                            const videoId = $this.attr('data-id');
                            const videoUrl = $this.attr('data-vid');
                            const divFisrt = $this.find('div:eq(0)');
                            divFisrt.append('<video class="video-js vjs-big-play-centered" id="VideoPlayer_Init_' + videoId + '"></video>');
                            const playerInstant = '#VideoPlayer_Init_' + videoId;
                            _this.playerService.initPlayer(playerInstant, videoUrl, 'video');
                    }
                }
            });
        });
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
    }


}
