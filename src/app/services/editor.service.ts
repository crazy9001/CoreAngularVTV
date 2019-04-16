import {Injectable} from '@angular/core';
import * as rangy from 'rangy';
import {PlayerService} from './player.service';
declare var $;

@Injectable({
    providedIn: 'root'
})
export class EditorService {

    constructor(
        private playerService: PlayerService
    ) {
    }

    ProcessHTMLBeforInsert = (html) => {
        const _html = $('<div>' + html + '</div>');
        const type = _html[0].querySelector('.VCSortableInPreviewMode').getAttribute('type');
        const _ranges = this.GetSelection()._ranges;
        if (_ranges.length > 0) {
            const $commonAncestorContainer = $(_ranges[0].commonAncestorContainer);
            const selector = $commonAncestorContainer.parents('.VCSortableInPreviewMode[type="' + type + '"]');
            console.log(selector.length);
            if (selector.length === 0) {
                if ($commonAncestorContainer.is('p') && $commonAncestorContainer.parents('.VCSortableInPreviewMode').length === 0) {
                    console.log('insert case 0');
                    this.InsertHtmlAt($commonAncestorContainer, html);
                    return;
                } else {
                    const $parent = $commonAncestorContainer.parent();
                    if ($parent.is('p') && $parent.parents('.VCSortableInPreviewMode').length === 0) {
                        console.log('insert case 1');
                        if ($parent.next().length === 0) {
                            $parent.after('<p></p>');
                        }
                        this.InsertHtmlAt($parent.next(), html);
                        return;
                    } else {
                        console.log('insert case 2');
                        document.execCommand('insertHTML', true, html);
                    }
                }
            }
        }
    }

    GetSelection = function () {
        return rangy.getSelection();
    };

    InsertHtmlAt (obj, html) {
        const selection = rangy.getSelection();
        if (selection.rangeCount > 0)  {
            selection.removeAllRanges();
        }
        const range = rangy.createRange();
        range.selectNode($(obj)[0]);
        selection.addRange(range);
        $(obj).remove();
        document.execCommand('insertHTML', true, html);
    }

    ProcessInputContent(data) {
        const obj = $('<div>' + data + '</div>');
        $('#NLElementFunc', obj).remove();
        $('#NLFuncEnter', obj).remove();
        $('.PhotoCMS_Caption', obj).each(function () {
            $(this).attr('contenteditable', 'false');
            $('p', $(this)).length === 0 ? (
                $(this).html('<p contenteditable="true" data-placeholder="[nhập chú thích]">' + $.trim($(this).text()) + '</p>')
            ) : (
                $('p', $(this)).attr('contenteditable', true)
            );
            if ($(this).text() === '') {
                $('p', $(this)).remove();
                console.log($(this));
            } else {
                $('p', $(this)).attr('contenteditable', false);
            }
        });
        return obj.html();
    }


    /**
     * Chuẩn hóa dữ liệu đầu vào
     * @param html
     * @constructor
     */
    ProcessInputContent2(html) {
        const NL = this;
        const $obj = $('<div>' + html + '</div>');
        $('.VCSortableInPreviewMode', $obj).each(function () {
            const $this = $(this);
            const type = $this.attr('type');
            if (typeof (type) !== 'undefined') {
                switch (type.toLowerCase()) {
                    case 'photo':
                        if ($this.find('.PhotoCMS_Caption').length === 0 && $this.find('div').length > 1) {
                            $this.find('div:eq(2)').addClass('PhotoCMS_Caption');
                        }
                        $('.PhotoCMS_Caption', $this).attr('contenteditable', false);
                        $('.PhotoCMS_Caption p', $this).attr('contenteditable', false);
                        break;
                    case 'videostream':
                        if ($this.find('.VideoCMS_Caption').length === 0 && $this.find('div').length > 1) {
                            $this.find('div:eq(1)').addClass('VideoCMS_Caption');
                        }
                        $('.VideoCMS_Caption', $this).attr('contenteditable', false);
                        $('.VideoCMS_Caption p', $this).attr('contenteditable', false);
                        /*const url = $(this).attr('data-vid');
                        const element = $('video', $this);
                        NL.playerService.initPlayer(element[0], url);*/
                        break;
                }
            }
        });
        $('.PhotoCMS_Caption, .VideoCMS_Caption', $obj).each(function () {
            $(this).attr('contenteditable', 'false');
            if ($('p', $(this)).length === 0) {
                $(this).html('<p contenteditable="false" placeholder="[nhập chú thích]">' + $.trim($(this).text()) + '</p>');
            } else {
                $('p', $(this)).attr('contenteditable', false);
            }
            const divJustify = $('div', $(this));
            if (divJustify.length > 0) {
                $(this).remove('p');
            }
        });
        return $obj.html();
    }


    InsertHtmlWithDataProcess(inputHtml) {
        const NL = this;
        const _ranges = NL.GetSelection()._ranges;
        const $commonAncestorContainer = $(_ranges[0].commonAncestorContainer);
        NL.ProcessHTMLBeforInsert(inputHtml);

    }

}
