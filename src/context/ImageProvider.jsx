import { createContext, useState } from 'react';

export const ImageContext = createContext({ imageFile: null, changeImageFile: () => {} });

const ImageProvider = props => {
	const [imageFile, setImageFile] = useState(localStorage.getItem('imageFile') || null);

	const changeImageFile = newFile => {
		setImageFile(newFile);
	};

	return <ImageContext.Provider value={{ imageFile, changeImageFile }}>{props.children}</ImageContext.Provider>;
};

export default ImageProvider;
