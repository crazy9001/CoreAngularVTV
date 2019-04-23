import {Injectable} from '@angular/core';
import * as rangy from 'rangy';
import {PlayerService} from './player.service';
import MediumEditor from 'medium-editor';

declare var $;

@Injectable({
    providedIn: 'root'
})
export class EditorService {

    constructor(
        private playerService: PlayerService
    ) {
    }

    CurrentSelection: any;
    CaptionAutoFormatObjectTypes: ['photo', 'video', 'videostream', 'iframe'];

    ProcessHTMLBeforInsert = (html) => {
        if (!this.RestoreSelection()) {
            console.log('selection not found!');
            return;
        }
        const _html = $('<div>' + html + '</div>');
        const type = _html[0].querySelector('.VCSortableInPreviewMode').getAttribute('type');
        const _ranges = this.GetSelection()._ranges;
        if (_ranges.length > 0) {
            const $commonAncestorContainer = $(_ranges[0].commonAncestorContainer);
            const selector = $commonAncestorContainer.parents('.VCSortableInPreviewMode[type="' + type + '"]');
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
                        MediumEditor.util.insertHTMLCommand(window.document, html);
                    }
                }
            }
        }
    }

    GetSelection = function () {
        return rangy.getSelection();
    };

    InsertHtmlAt(obj, html) {
        const selection = rangy.getSelection();
        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }
        const range = rangy.createRange();
        range.selectNode($(obj)[0]);
        selection.addRange(range);
        this.SaveSelection();
        $(obj).remove();
        this.ProcessHTMLBeforInsert(html);
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


    SaveSelection() {
        this.CurrentSelection = rangy.getSelection().getAllRanges();
        const node = rangy.getSelection().anchorNode;
        return this.CurrentSelection;
    }

    RestoreSelection() {
        if (this.CurrentSelection.length > 0) {
            rangy.getSelection().setRanges(this.CurrentSelection);
            return true;
        } else {
            return false;
        }
    }

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
                            $this.find('div:eq(1)').addClass('PhotoCMS_Caption');
                        }
                        $('.PhotoCMS_Caption', $this).attr('contenteditable', false);
                        $('.PhotoCMS_Caption p', $this).attr('contenteditable', true);
                        break;
                    case 'videostream':
                        if ($this.find('.VideoCMS_Caption').length === 0 && $this.find('div').length > 1) {
                            $this.find('div:eq(1)').addClass('VideoCMS_Caption');
                        }
                        $('.VideoCMS_Caption', $this).attr('contenteditable', false);
                        $('.VideoCMS_Caption p', $this).attr('contenteditable', true);
                        break;
                    case 'iframe' :
                        if ($this.find('.IframeCMS_Caption').length === 0 && $this.find('div').length > 1) {
                            $this.find('div:eq(1)').addClass('IframeCMS_Caption');
                        }
                        $('.IframeCMS_Caption', $this).attr('contenteditable', false);
                        $('.IframeCMS_Caption p', $this).attr('contenteditable', true);
                        break;
                }
            }
        });
        $('.PhotoCMS_Caption, .VideoCMS_Caption, .IframeCMS_Caption', $obj).each(function () {
            $(this).attr('contenteditable', 'false');
            if ($('p', $(this)).length === 0) {
                $(this).html('<p contenteditable="true" placeholder="[nhập chú thích]" class="NLPlaceholderShow">' + $.trim($(this).text()) + '</p>');
            } else {
                $('p', $(this)).attr('contenteditable', true);
            }
            const divJustify = $('div', $(this));
            if (divJustify.length > 0) {
                $(this).remove('p');
            }
        });
        return $obj.html();
    }

    IsChrome () {
        return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    }

    GetContentEditableType(obj) {
        if (obj !== '') {
            if (this.IsChrome() && $(obj).attr('type') !== 'content') {
                return 'plaintext-only';
            } else {
                return 'true';
            }
        } else {
            if (this.IsChrome()) {
                return 'plaintext-only';
            }
        }
        return 'true';
    }
    InsertHtmlWithDataProcess(inputHtml) {
        const NL = this;
        const _ranges = NL.GetSelection()._ranges;
        const $commonAncestorContainer = $(_ranges[0].commonAncestorContainer);
        NL.ProcessHTMLBeforInsert(inputHtml);

    }

}
