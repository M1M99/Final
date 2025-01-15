import React from 'react'
import styled from 'styled-components'
import photoProfil from '../assets/default-avatar.png'

function Header() {
  const Container1 = styled.div`
    height: 82px;
    background-color: #121825;
    border-radius: 17px;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center; 
    justify-content: space-between;
  `

  const Span = styled.span`
    color: #FFFFFF;
    font-size: 22px;
    font-weight: 600;
  `

  const IMG = styled.img`
    width: 32px; 
    height: 32px;
  `
  return (
    <Container1>
      <Span>Crypto Currency</Span>
      <IMG src={photoProfil} alt="Profil" />
    </Container1>
  )
}

export default Header
