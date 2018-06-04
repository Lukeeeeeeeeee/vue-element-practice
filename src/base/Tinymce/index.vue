<template>
    <div class="tinymce-container">
        <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
        <div class="editor-custom-btn-container">
            <editor-image color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editor-image>
        </div>
    </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import EditorImage from './components/editorImage'

export default {
    name: 'tinymce',
    components: {
        EditorImage
    },
    props: {
        id: {
            type: String
        },
        value: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        menubar: {
            default: 'file edit insert view format table'
        },
        height: {
            type: Number,
            required: false,
            default: 360
        }
    },
    data() {
        return {
            tinymceId: this.id || 'vue-tinymce-' + +new Date(),
            hasInit: false,
            hasChange: false
        }
    },
    // 当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，
    // 退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated
    mounted() {
        this.initTinymce()
    },
    activated() {
        this.initTinymce()
    },
    deactivated() {
        this.destroyTinymce()
    },
    methods: {
        initTinymce() {
            const _this = this;
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                language: 'zh_CN',
                body_class: 'panel-body',
                height: this.height,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: this.menubar,
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                default_link_target: '_blank',
                link_title: false,
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value)
                    }
                    _this.hasInit = true;
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true;
                        this.$emit('input', editor.getContent())
                    })
                }
            })
        },
        destroyTinymce() {
            if (window.tinymce.get(this.tinymceId)) {
                window.tinymce.get(this.tinymceId).destroy()
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent()
        },
        imageSuccessCBK(arr) {
            const _this = this;
            arr.forEach(v => {
                window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`);
            })
        }
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val));
            }
        }
    },
    destroyed() {
        this.destroyTinymce()
    }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
    position: relative;
    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        .editor-upload-btn {
            display: inline-block;
        }
    }
}
</style>
<style scoped>
.tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
}
</style>


