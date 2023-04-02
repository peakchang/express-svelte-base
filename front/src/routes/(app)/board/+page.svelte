<script>
    import { onMount } from "svelte";
    import axios from "axios";

    let editor;
    let imgArr = [];


    onMount(async () => {
        const { default: Quill } = await import("quill");
        var img_fomat = Quill.import("formats/image");
        img_fomat.className = "inline-block";
        Quill.register(img_fomat, true);

        let quill = new Quill(editor, {
            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        [
                            { align: "" },
                            { align: "center" },
                            { align: "right" },
                            { align: "justify" },
                        ],
                        // [{ list: "ordered" }, { list: "bullet" }],
                        ["image", "code-block"],
                    ],
                    handlers: {
                        image: imageHandler,
                    },
                },
            },

            theme: "snow",
            placeholder: "Write your story...",
        });
        // var toolbar = quill.getModule("toolbar");
        // toolbar.addHandler("image", showImageUI);

        function imageHandler() {
            // input file tag 생성
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", ".png,.jpg,.jpeg");
            input.click();

            // input change
            input.onchange = (e) => {
                const maxWidth = 1200;
                const file = e.target.files[0];
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (r) {
                    const img = new Image();
                    img.src = r.target.result;

                    img.onload = async function (e) {
                        if (img.width >= maxWidth) {
                            var share = img.width / maxWidth;
                            var setHeight = Math.floor(img.height / share);
                            var setWidth = maxWidth;
                        } else {
                            var setWidth = img.width;
                            var setHeight = img.height;
                        }

                        var canvas = document.createElement("canvas");
                        canvas.width = setWidth;
                        canvas.height = setHeight;
                        canvas.display = "inline-block";
                        canvas
                            .getContext("2d")
                            .drawImage(img, 0, 0, setWidth, setHeight);

                        var getReImgUrl = canvas.toDataURL("image/webp");
                        // console.log(getReImgUrl);

                        const resultImage = dataURItoBlob(getReImgUrl);

                        let imgForm = new FormData();

                        const timestamp = new Date().getTime();
                        const fileName = `${timestamp}${Math.random()
                            .toString(36)
                            .substring(2, 11)}.webp`;
                        imgForm.append("editorimg", resultImage, fileName);
                        console.log("**************************");
                        console.log(imgForm);

                        const getImgUrl = await axios.post(
                            import.meta.env.VITE_SERVER_URL + "/board/uploads",
                            imgForm,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                        console.log(getImgUrl.data.baseUrl);

                        // console.log(resultImage);
                        // imgArr.push(resultImage);
                        // console.log(imgArr);

                        const range = quill.getSelection();
                        quill.insertEmbed(range.index, "image", getImgUrl.data.baseUrl);
                        quill.insertText(range.index + 1, "\n");

                        quill.setSelection(range.index + 2);
                    };
                };
            };
        }
    });

    const dataURItoBlob = (dataURI) => {
        const bytes =
            dataURI.split(",")[0].indexOf("base64") >= 0
                ? atob(dataURI.split(",")[1])
                : unescape(dataURI.split(",")[1]);
        const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };

    const uploadContent = () => {
        console.log(editor);
        const editorContent = editor.querySelector(".ql-editor");
        console.log(editorContent.innerHTML);
    };
</script>

<div class="main_container">
    <div class="editor-wrapper">
        <div bind:this={editor} />
    </div>

    <div>
        <button on:click={uploadContent}>완료완료</button>
    </div>
</div>


<style>
    @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
</style>
