import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  value: string | undefined;
  update: (value: string) => void;
}

const Editor = ({ value, update }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      handleDrop: () => true,
    },
    content: value,
    onUpdate: ({ editor }) => {
      // TODO
      //update(editor.getHTML().replaceAll(/\<br.*?\>/g, ""));
      update(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (!value && !editor?.isFocused) {
      editor?.commands.focus();
    }
  }, [value, editor]);

  return (
    <>
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default Editor;
