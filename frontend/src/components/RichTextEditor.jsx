import React, { useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Undo,
  Redo,
  Minus,
} from "lucide-react";
import { useTooltip } from "../hooks/useTooltip";

// ── Standard SaaS Tooltip Behavior ───────────────────────────────────────────
// Research-backed behavior:
//  • 350ms SHOW delay   — prevents flash on cursor pass-through
//  • 0ms   HIDE delay   — instant dismiss (feels snappy)
//  • Hide on click      — tooltip suppressed until fresh hover
//  • Keyboard shortcut  — shown inline in label (Figma/Linear pattern)
//  • Slide + fade animation — standard entry motion
//  • ARIA role="tooltip" — accessible to screen readers

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  shortcut,
  children,
}) {
  const { isVisible, showTooltip, hideTooltip, hideAndSuppress } = useTooltip();

  const handleClick = () => {
    hideAndSuppress();
    onClick();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => showTooltip(disabled)}
      onMouseLeave={hideTooltip}
    >
      {/* The action button */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()} // prevent editor blur
        onClick={handleClick}
        disabled={disabled}
        aria-label={label}
        aria-describedby={isVisible ? `tooltip-${label}` : undefined}
        className={`p-1.5 rounded-md transition-all text-[13px] flex items-center justify-center
          ${
            active
              ? "text-white bg-white/15"
              : "text-text-muted hover:text-white hover:bg-white/8"
          }
          ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {children}
      </button>

      {/* Tooltip — standard SaaS: fade + 4px upward slide */}
      {isVisible && (
        <div
          id={`tooltip-${label}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 mb-2.5 px-2.5 py-1.5 rounded-lg
            text-[11px] font-semibold whitespace-nowrap text-white
            pointer-events-none z-50 flex items-center gap-1.5 tooltip-visible"
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            transform: "translateX(-50%)",
          }}
        >
          {/* Label */}
          {label}
          {/* Keyboard shortcut badge */}
          {shortcut && (
            <span
              className="text-[10px] font-bold px-1 py-0.5 rounded"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.02em",
              }}
            >
              {shortcut}
            </span>
          )}
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #1a1a1a",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ── Toolbar Divider ───────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="w-px h-5 mx-1 shrink-0"
      style={{ backgroundColor: "var(--color-border)" }}
    />
  );
}

// ── Main Editor ───────────────────────────────────────────────────────────────
function RichTextEditor({
  content,
  onChange,
  placeholder = "Write your release notes here...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: { languageClassPrefix: "language-" },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "tiptap-link",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      FontFamily,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        spellcheck: "true",
      },
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) return null;

  const IC = 15;
  const IS = 1.8;

  // ── Keyboard Shortcut Formatter ────────────────────────────────────────────
  // Mac: ⌘⇧H (glued together per Apple guidelines)
  // Win: Ctrl + Shift + H (spaced out for readability)
  const formatShortcut = (key, map = {}) => {
    const isMac =
      typeof navigator !== "undefined" && navigator.platform.includes("Mac");
    if (isMac) {
      return `${map.alt ? "⌥" : ""}${map.shift ? "⇧" : ""}⌘${key}`;
    }
    const parts = ["Ctrl"];
    if (map.alt) parts.push("Alt");
    if (map.shift) parts.push("Shift");
    parts.push(key);
    return parts.join(" + ");
  };

  return (
    <div
      className="rounded-xl flex flex-col border overflow-visible"
      style={{
        borderColor: "var(--color-border)",
        minHeight: "320px",
      }}
    >
      {/* ── Toolbar ── */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b shrink-0"
        style={{
          backgroundColor: "var(--color-bg-elevated)",
          borderColor: "var(--color-border)",
          borderTopLeftRadius: "11px",
          borderTopRightRadius: "11px",
        }}
      >
        {/* Undo / Redo */}
        <ToolbarButton
          label="Undo"
          shortcut={formatShortcut("Z")}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          shortcut={formatShortcut("Z", { shift: true })}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={IC} strokeWidth={IS} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          label="Heading 1"
          shortcut={formatShortcut("1", { alt: true })}
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          shortcut={formatShortcut("2", { alt: true })}
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          shortcut={formatShortcut("3", { alt: true })}
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={IC} strokeWidth={IS} />
        </ToolbarButton>

        <Divider />

        {/* Text Formatting */}
        <ToolbarButton
          label="Bold"
          shortcut={formatShortcut("B")}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          shortcut={formatShortcut("I")}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          shortcut={formatShortcut("U")}
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          shortcut={formatShortcut("S", { shift: true })}
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Code"
          shortcut={formatShortcut("E")}
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Highlight"
          shortcut={formatShortcut("H", { shift: true })}
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter size={IC} strokeWidth={IS} />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          label="Align Left"
          shortcut={formatShortcut("L", { shift: true })}
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Align Center"
          shortcut={formatShortcut("E", { shift: true })}
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Align Right"
          shortcut={formatShortcut("R", { shift: true })}
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={IC} strokeWidth={IS} />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          label="Bullet List"
          shortcut={formatShortcut("8", { shift: true })}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered List"
          shortcut={formatShortcut("7", { shift: true })}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Blockquote"
          shortcut={formatShortcut("B", { shift: true })}
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={IC} strokeWidth={IS} />
        </ToolbarButton>

        <Divider />

        {/* Link + HR */}
        <ToolbarButton
          label="Insert Link"
          shortcut={formatShortcut("K")}
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon size={IC} strokeWidth={IS} />
        </ToolbarButton>
        <ToolbarButton
          label="Divider Line"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={IC} strokeWidth={IS} />
        </ToolbarButton>
      </div>

      {/* ── Editor Area ── */}
      <div
        className="flex-1 overflow-y-auto"
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

export default RichTextEditor;
