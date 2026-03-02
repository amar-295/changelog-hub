import React from "react";
import PropTypes from "prop-types";
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
import ToolbarButton from "./ToolbarButton";
import LinkMenu from "./LinkMenu";

const IC = 15;
const IS = 1.8;

function Divider() {
    return (
        <div
            className="w-px h-5 mx-1 shrink-0"
            style={{ backgroundColor: "var(--color-border)" }}
        />
    );
}

// Mac: ⌘⇧H — Win: Ctrl + Shift + H
function formatShortcut(key, map = {}) {
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
}

function EditorToolbar({ editor, linkMenu, onOpenLink, onSubmitLink, onRemoveLink, onCloseLinkMenu, onUrlChange }) {
    return (
        <div
            className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b shrink-0 relative"
            style={{
                backgroundColor: "var(--color-bg-elevated)",
                borderColor: "var(--color-border)",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
            }}
        >
            <LinkMenu
                isOpen={linkMenu.isOpen}
                url={linkMenu.url}
                onUrlChange={onUrlChange}
                onSubmit={onSubmitLink}
                onRemove={onRemoveLink}
                onClose={onCloseLinkMenu}
            />

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
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 size={IC} strokeWidth={IS} />
            </ToolbarButton>
            <ToolbarButton
                label="Heading 2"
                shortcut={formatShortcut("2", { alt: true })}
                active={editor.isActive("heading", { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 size={IC} strokeWidth={IS} />
            </ToolbarButton>
            <ToolbarButton
                label="Heading 3"
                shortcut={formatShortcut("3", { alt: true })}
                active={editor.isActive("heading", { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 size={IC} strokeWidth={IS} />
            </ToolbarButton>

            <Divider />

            {/* Text formatting */}
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
                shortcut={formatShortcut("X", { shift: true })}
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
                onClick={onOpenLink}
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
    );
}

EditorToolbar.propTypes = {
    editor: PropTypes.object.isRequired,
    linkMenu: PropTypes.shape({
        isOpen: PropTypes.bool.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    onOpenLink: PropTypes.func.isRequired,
    onSubmitLink: PropTypes.func.isRequired,
    onRemoveLink: PropTypes.func.isRequired,
    onCloseLinkMenu: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
};

export default EditorToolbar;
