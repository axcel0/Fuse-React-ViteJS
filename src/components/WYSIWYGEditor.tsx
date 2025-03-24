import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';

/**
 * The root component of the WYSIWYG editor.
 */
const Root = styled('div')({
	'& .rdw-dropdown-selectedtext': {
		color: 'inherit'
	},
	'& .rdw-editor-toolbar': {
		borderWidth: '0 0 1px 0!important',
		margin: '0!important'
	},
	'& .rdw-editor-main': {
		padding: '8px 12px',
		height: `${256}px!important`
	}
});

/* The props for the WYSIWYG editor component.
 */
type WYSIWYGEditorProps = {
	className?: string;
	onChange: (T: string) => void;
	ref: React.ForwardedRef<HTMLDivElement>;
};

/**
 * The WYSIWYG editor component.
 */
function WYSIWYGEditor(props: WYSIWYGEditorProps) {
	const { onChange, className = '', ref } = props;

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	/**
	 * The function to call when the editor state changes.
	 */
	function onEditorStateChange(_editorState: EditorState) {
		setEditorState(_editorState);

		return onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
	}

	return (
		<Root
			className={clsx('w-full overflow-hidden rounded-sm border-1', className)}
			ref={ref}
		>
			<Editor
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
			/>
		</Root>
	);
}

export default WYSIWYGEditor;
