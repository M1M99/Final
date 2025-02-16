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
  const UserContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px; 
  padding: 8px 14px 8px 14px;
  border: 1px #222B44 solid;
  border-radius: 6px;
  opacity: 0px;

 `

  const Span2 = styled.span`
    color: #FFFF; 
    font-weight: 500;
    font-size: 14px; 
    line-height: 18px
  `

  const IMG = styled.img`
    width: 32px; 
    height: 32px;
  `
  
  return (
    <Container1>
      <Span>Crypto Currency</Span>
      <UserContainer>
        <IMG src={photoProfil} alt="Profil" />
        <Span2>Administrator</Span2>
      </UserContainer>
    </Container1>
  )
}

export default Header
