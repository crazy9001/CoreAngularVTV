(function () {
    'use strict';

    var ImagePreview = MediumEditor.Extension.extend({
        name: 'image-preview',

        // Image Preview Options

        /* hideDelay: [number]  (previously options.imagePreviewHideDelay)
         * time in milliseconds to show the image tag preview after the mouse has left the image tag.
         */
        hideDelay: 500,

        /* previewValueSelector: [string]
         * the default selector to locate where to put the activeImage value in the preview
         */
        previewValueSelector: 'img',

        /* showWhenToolbarIsVisible: [boolean]
         * determines whether the image tag preview shows up when the toolbar is visible
         */
        showWhenToolbarIsVisible: false,

        /* showOnEmptyLinks: [boolean]
        * determines whether the image tag preview shows up on links with src="" or src="#something"
        */
        showOnEmptyLinks: true,

        init: function () {
            this.imagePreview = this.createPreview();

            this.getEditorOption('elementsContainer').appendChild(this.imagePreview);

            this.attachToEditables();

        },

        getInteractionElements: function () {
            return this.getPreviewElement();
        },

        // TODO: Remove this function in 6.0.0
        getPreviewElement: function () {
            return this.imagePreview;
        },

        createPreview: function () {
            var el = this.document.createElement('div');

            el.id = 'medium-editor-image-preview-' + this.getEditorId();
            el.className = 'medium-editor-image-preview';
            el.innerHTML = this.getTemplate();

            this.on(el, 'click', this.handleClick.bind(this));

            return el;
        },

        getTemplate: function () {
            return '<div class="medium-editor-toolbar-image-preview" id="medium-editor-toolbar-image-preview">' +
                '    <a class="medium-editor-toolbar-image-preview-inner"></a>' +
                '</div>';
        },

        destroy: function () {
            if (this.imagePreview) {
                if (this.imagePreview.parentNode) {
                    this.imagePreview.parentNode.removeChild(this.imagePreview);
                }
                delete this.imagePreview;
            }
        },

        hidePreview: function () {
            if (this.imagePreview) {
                this.imagePreview.classList.remove('medium-editor-image-preview-active');
            }
            this.activeImage = null;
        },

        showPreview: function (imageEl) {
            if (this.imagePreview.classList.contains('medium-editor-image-preview-active') ||
                imageEl.getAttribute('data-disable-preview')) {
                return true;
            }

            if (this.previewValueSelector) {
                this.imagePreview.querySelector(this.previewValueSelector).textContent = imageEl.attributes.src.value;
                this.imagePreview.querySelector(this.previewValueSelector).href = imageEl.attributes.src.value;
            }

            this.imagePreview.classList.add('medium-toolbar-arrow-over');
            this.imagePreview.classList.remove('medium-toolbar-arrow-under');

            if (!this.imagePreview.classList.contains('medium-editor-image-preview-active')) {
                this.imagePreview.classList.add('medium-editor-image-preview-active');
            }

            this.activeImage = imageEl;

            this.positionPreview();
            this.attachPreviewHandlers();

            return this;
        },

        positionPreview: function (activeImage) {
            activeImage = activeImage || this.activeImage;
            var containerWidth = this.window.innerWidth,
                buttonHeight = this.imagePreview.offsetHeight,
                boundary = activeImage.getBoundingClientRect(),
                diffLeft = this.diffLeft,
                diffTop = this.diffTop,
                elementsContainer = this.getEditorOption('elementsContainer'),
                elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
                relativeBoundary = {},
                halfOffsetWidth, defaultLeft, middleBoundary, elementsContainerBoundary, top;

            halfOffsetWidth = this.imagePreview.offsetWidth / 2;
            var toolbarExtension = this.base.getExtensionByName('toolbar');
            if (toolbarExtension) {
                diffLeft = toolbarExtension.diffLeft;
                diffTop = toolbarExtension.diffTop;
            }
            defaultLeft = diffLeft - halfOffsetWidth;

            // If container element is absolute / fixed, recalculate boundaries to be relative to the container
            if (elementsContainerAbsolute) {
                elementsContainerBoundary = elementsContainer.getBoundingClientRect();
                ['top', 'left'].forEach(function (key) {
                    relativeBoundary[key] = boundary[key] - elementsContainerBoundary[key];
                });

                relativeBoundary.width = boundary.width;
                relativeBoundary.height = boundary.height;
                boundary = relativeBoundary;

                containerWidth = elementsContainerBoundary.width;

                // Adjust top position according to container scroll position
                top = elementsContainer.scrollTop;
            } else {
                // Adjust top position according to window scroll position
                top = this.window.pageYOffset;
            }

            middleBoundary = boundary.left + boundary.width / 2;
            top += buttonHeight + boundary.top + boundary.height - diffTop - this.imagePreview.offsetHeight;

            this.imagePreview.style.top = Math.round(top) + 'px';
            this.imagePreview.style.right = 'initial';
            if (middleBoundary < halfOffsetWidth) {
                this.imagePreview.style.left = defaultLeft + halfOffsetWidth + 'px';
                this.imagePreview.style.right = 'initial';
            } else if ((containerWidth - middleBoundary) < halfOffsetWidth) {
                this.imagePreview.style.left = 'auto';
                this.imagePreview.style.right = 0;
            } else {
                this.imagePreview.style.left = defaultLeft + middleBoundary + 'px';
                this.imagePreview.style.right = 'initial';
            }
        },

        attachToEditables: function () {
            this.subscribe('editableMouseover', this.handleEditableMouseover.bind(this));
            this.subscribe('positionedToolbar', this.handlePositionedToolbar.bind(this));
        },

        handlePositionedToolbar: function () {
            // If the toolbar is visible and positioned, we don't need to hide the preview
            // when showWhenToolbarIsVisible is true
            if (!this.showWhenToolbarIsVisible) {
                this.hidePreview();
            }
        },

        handleClick: function (event) {
            var imageExtension = this.base.getExtensionByName('image'),
                activeImage = this.activeImage;

            if (imageExtension && activeImage) {
                event.preventDefault();

                this.base.selectElement(this.activeImage);

                // Using setTimeout + delay because:
                // We may actually be displaying the image form, which should be controlled by delay
                this.base.delay(function () {
                    if (activeImage) {
                        var opts = {
                            value: activeImage.attributes.src.value,
                            target: activeImage.getAttribute('target'),
                            buttonClass: activeImage.getAttribute('class')
                        };
                        imageExtension.showForm(opts);
                        activeImage = null;
                    }
                }.bind(this));
            }

            this.hidePreview();
        },

        handleImageMouseout: function () {
            this.imageToPreview = null;
            this.off(this.activeImage, 'mouseout', this.instanceHandleImageMouseout);
            this.instanceHandleImageMouseout = null;
        },

        handleEditableMouseover: function (event) {
            var target = MediumEditor.util.getClosestTag(event.target, 'img');

            if (false === target) {
                return;
            }

            // Detect empty src attributes
            // The browser will make src="" or src="#top"
            // into absolute urls when accessed as event.target.src, so check the html
            if (!this.showOnEmptyLinks &&
                (!/src=["']\S+["']/.test(target.outerHTML) || /src=["']#\S+["']/.test(target.outerHTML))) {
                return true;
            }

            // only show when toolbar is not present
            var toolbar = this.base.getExtensionByName('toolbar');
            if (!this.showWhenToolbarIsVisible && toolbar && toolbar.isDisplayed && toolbar.isDisplayed()) {
                return true;
            }

            // detach handler for other image in case we hovered multiple images quickly
            if (this.activeImage && this.activeImage !== target) {
                this.detachPreviewHandlers();
            }

            this.imageToPreview = target;

            this.instanceHandleImageMouseout = this.handleImageMouseout.bind(this);
            this.on(this.imageToPreview, 'mouseout', this.instanceHandleImageMouseout);
            // Using setTimeout + delay because:
            // - We're going to show the image preview according to the configured delay
            //   if the mouse has not left the image tag in that time
            this.base.delay(function () {
                if (this.imageToPreview) {
                    this.showPreview(this.imageToPreview);
                }
            }.bind(this));
        },

        handlePreviewMouseover: function () {
            this.lastOver = (new Date()).getTime();
            this.hovering = true;
        },

        handlePreviewMouseout: function (event) {
            if (!event.relatedTarget || !/image-preview/.test(event.relatedTarget.className)) {
                this.hovering = false;
            }
        },

        updatePreview: function () {
            if (this.hovering) {
                return true;
            }
            var durr = (new Date()).getTime() - this.lastOver;
            if (durr > this.hideDelay) {
                // hide the preview 1/2 second after mouse leaves the link
                this.detachPreviewHandlers();
            }
        },

        detachPreviewHandlers: function () {
            // cleanup
            clearInterval(this.intervalTimer);
            if (this.instanceHandlePreviewMouseover) {
                this.off(this.imagePreview, 'mouseover', this.instanceHandlePreviewMouseover);
                this.off(this.imagePreview, 'mouseout', this.instanceHandlePreviewMouseout);
                if (this.activeImage) {
                    this.off(this.activeImage, 'mouseover', this.instanceHandlePreviewMouseover);
                    this.off(this.activeImage, 'mouseout', this.instanceHandlePreviewMouseout);
                }
            }

            this.hidePreview();

            this.hovering = this.instanceHandlePreviewMouseover = this.instanceHandlePreviewMouseout = null;
        },

        // TODO: break up method and extract out handlers
        attachPreviewHandlers: function () {
            this.lastOver = (new Date()).getTime();
            this.hovering = true;

            this.instanceHandlePreviewMouseover = this.handlePreviewMouseover.bind(this);
            this.instanceHandlePreviewMouseout = this.handlePreviewMouseout.bind(this);

            this.intervalTimer = setInterval(this.updatePreview.bind(this), 200);

            this.on(this.imagePreview, 'mouseover', this.instanceHandlePreviewMouseover);
            this.on(this.imagePreview, 'mouseout', this.instanceHandlePreviewMouseout);
            this.on(this.activeImage, 'mouseover', this.instanceHandlePreviewMouseover);
            this.on(this.activeImage, 'mouseout', this.instanceHandlePreviewMouseout);
        }
    });

    MediumEditor.extensions.imagePreview = ImagePreview;
}());
