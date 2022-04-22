import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];

    // methods
    onSelectedSize: (size: ISize) => void;
}
export const ProductSizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <Box>
            { sizes.map(size => (
                <Button
                    key={ size }
                    size='small'
                    onClick={ () => onSelectedSize(size) }
                    color={ selectedSize === size ? 'primary' : 'info' }
                >
                    { size }
                </Button>
            )) }
        </Box>
    )
}
