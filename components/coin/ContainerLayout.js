import { Container } from '@mui/material'
import React from 'react'

export default function ContainerLayout({ children }) {
    return (
        <Container className='bg-slate-800 rounded py-6 '>
            {children}
        </Container>
    )
}
