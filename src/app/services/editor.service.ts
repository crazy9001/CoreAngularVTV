import {Injectable} from '@angular/core';
import * as rangy from 'rangy';
declare var $;

@Injectable({
    providedIn: 'root'
})
export class EditorService {

    constructor() {
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
                    this.InsertHtmlAt($commonAncestorContainer, html + '<p></p>');
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

}
