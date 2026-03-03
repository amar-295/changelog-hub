import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import EditorToolbar from "./EditorToolbar";

function RichTextEditor({
  content,
  onChange,
  placeholder = "Write your release notes here...",
  fullPage = false,
}) {
  const [linkMenu, setLinkMenu] = useState({ isOpen: false, url: "" });

  const extensions = useMemo(() => {
    return [
      StarterKit.configure({
        codeBlock: { languageClassPrefix: "language-" },
        history: true,
        heading: true,
        bold: true,
        italic: true,
        strike: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      FontFamily,
      Underline.configure(),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "tiptap-link" },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ];
  }, [placeholder]);

  const openLinkMenu = useCallback((editorInst) => {
    const previousUrl = editorInst.getAttributes("link").href || "";
    setLinkMenu({ isOpen: true, url: previousUrl });
  }, []);

  const editor = useEditor({
    extensions,
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "tiptap-editor", spellcheck: "true" },
      handleKeyDown: (view, event) => {
        if (event.metaKey || event.ctrlKey) {
          if (event.key.toLowerCase() === "k" && !event.shiftKey) {
            event.preventDefault();
            const currentEditor = editorRef.current;
            if (currentEditor) openLinkMenu(currentEditor);
            return true;
          }
          if (event.key.toLowerCase() === "k" && event.shiftKey) {
            event.preventDefault();
            const currentEditor = editorRef.current;
            if (currentEditor) {
              currentEditor
                .chain()
                .focus()
                .extendMarkRange("link")
                .unsetLink()
                .run();
            }
            return true;
          }
        }
        if (event.code === "Space" && editor.isActive("link")) {
          const { $from } = editor.state.selection;
          if ($from.pos === $from.end()) {
            editor.chain().focus().unsetLink().insertContent(" ").run();
            return true;
          }
        }
        return false;
      },
    },
  });

  const editorRef = useRef(null);
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  const submitLink = useCallback(
    (e) => {
      e?.preventDefault();
      if (!editor) return;
      let url = linkMenu.url.trim();
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
          url = "https://" + url;
        }
        if (editor.state.selection.empty) {
          editor
            .chain()
            .focus()
            .insertContent(`<a href="${url}">${url}</a>`)
            .run();
        } else {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }
      }
      setLinkMenu({ isOpen: false, url: "" });
    },
    [editor, linkMenu.url],
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    openLinkMenu(editor);
  }, [editor, openLinkMenu]);

  if (!editor) return null;

  const toolbarProps = {
    editor,
    linkMenu,
    onOpenLink: setLink,
    onSubmitLink: submitLink,
    onRemoveLink: () => {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkMenu({ isOpen: false, url: "" });
    },
    onCloseLinkMenu: () => setLinkMenu({ isOpen: false, url: "" }),
    onUrlChange: (url) => setLinkMenu((prev) => ({ ...prev, url })),
  };

  /* ── Full-page mode (CreateReleasePage) ── */
  if (fullPage) {
    return (
      <>
        <EditorToolbar {...toolbarProps} sticky />
        <div
          className="flex-1 overflow-y-auto cursor-pointer editor-full-page"
          style={{ backgroundColor: "var(--color-bg-elevated)" }}
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </>
    );
  }

  /* ── Default (modal / embedded) mode ── */
  return (
    <div
      className="rounded-xl flex flex-col border overflow-visible"
      style={{ borderColor: "var(--color-border)", minHeight: "320px" }}
    >
      <EditorToolbar {...toolbarProps} />
      <div
        className="flex-1 overflow-y-auto cursor-pointer"
        style={{
          backgroundColor: "var(--color-bg-input)",
          borderBottomLeftRadius: "11px",
          borderBottomRightRadius: "11px",
        }}
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

RichTextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default RichTextEditor;
