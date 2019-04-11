$(document).on({
    mouseenter: function (e) {
        const $this = $(this);
        console.log($this);
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
        console.log(obj);
        var func = _this.attr('data-func');
        switch (func) {
            case 'elm-remove':
                $('.VCSortableInPreviewMode.active').remove();
                $('#NLParagraphFunc').hide();
                $('#NLElementFunc').remove();
                break;
        }
    })

}

function GetObjectFunction(obj, type) {
    let func = '<div id="NLElementFunc" contenteditable="false" class="NLNoTrackChange" style="left: 245px"><ul>';
    switch (type.toLowerCase()) {
        case 'photo':
            func += '<li data-func="photo-edit" title="Chỉnh sửa ảnh"><i class="fa fa-object-group"></i></li>';
            func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
            break;
        case 'videostream':
            func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
        default:
            func += '<li data-func="elm-cog" title="Cấu hình"><i class="fa fa-cog"></i></li>';
            break;
    }
    func += '</ul></div>';
    return func;
}




