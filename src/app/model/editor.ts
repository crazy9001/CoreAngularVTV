const MediumEditorConfig = {
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
}

export {
    MediumEditorConfig
};
