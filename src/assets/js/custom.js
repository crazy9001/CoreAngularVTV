$(document).on({
    mouseenter: function (e) {
        const $this = $(this);
        $this.addClass('active');
        ShowFunctions($this);
    },
    mouseleave: function (e) {
        $(this).removeClass('active');
        $('#NLElementFunc').hide();
        $('#NLFuncEnter').hide();
    }
}, "#NLEditor .VCSortableInPreviewMode")


function ShowFunctions(obj) {
    const NL = this;
    const type = $(obj).attr('type');
    let func = '';
    $('#NLEditor > br').remove();

    func += this.GetObjectFunction(obj, type);
    const divEnter = '<div id="NLFuncEnter" contenteditable="false" title="Tạo dòng mới"></div>';
    $('#NLElementFunc').remove();
    $('#NLFuncEnter').remove();
    $(obj).append(func);
    $(obj).append(divEnter);

    $(document).on('click', '#NLElementFunc li', function (e) {
        var _this = $(this);
        var func = _this.attr('data-func');
        switch (func) {
            case 'elm-remove':
                $('.VCSortableInPreviewMode.active').remove();
                $('#NLParagraphFunc').hide();
                $('#NLElementFunc').remove();
                break;
        }
    })


    $('#NLFuncEnter').off('click').on('click', function (evt) {
        $(obj).after('<p>aaa</p>');
        var ed = $(obj).attr('contenteditable');
        if (typeof (ed) != "undefined") {
            $(obj).attr('data-contenteditable', ed);
        }
        $(obj).attr('contenteditable', 'false');
        var $p = $(obj).next('p');
        var p = $p.get(0);
        var s = window.getSelection(), r = document.createRange();
        //p.innerHTML = '\u00a0';
        p.innerHTML = '';
        r.selectNodeContents(p);
        s.removeAllRanges();
        s.addRange(r);
        //return;
        //document.execCommand('delete', false, null);
        setTimeout(function () {
            //NL.PlaceCaretAtEnd($(obj).next('p'));
            //$(obj).next('p').focus();
            var oldEd = $(obj).attr('data-contenteditable');
            if (typeof (oldEd) != "undefined") {
                $(obj).attr('contenteditable', oldEd);
            }
            $(obj).removeAttr('data-contenteditable');
            $(obj).next('p').trigger('mouseup');
            ScrollTo($(obj).next('p'));
        }, 100);
        evt.preventDefault();
    });


}

ScrollTo = function (obj) {
    var isScroll = true;
    if ($(obj).is('.alignLeft,.alignRight')) {
        isScroll = false;
    }
    if (isScroll) {
        $('#IMSNewsLayout').animate({'scrollTop': $('#IMSNewsLayout').scrollTop() + 30});
    }
};

function GetObjectFunction(obj, type) {
    let func = '<div id="NLElementFunc" contenteditable="false" class="NLNoTrackChange" style="left: 50%; margin-left: -15px"><ul>';
    switch (type.toLowerCase()) {
        case 'photo':
            func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
            break;
        case 'videostream':
            func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
            break;
        case 'iframe':
            func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
            break;
        default:
            func += '<li data-func="elm-cog" title="Cấu hình"><i class="fa fa-cog"></i></li>';
            break;
    }
    func += '</ul></div>';
    return func;
}




