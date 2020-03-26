import styled from 'styled-components';

export const Organization = styled.div`
  display: flex;
  background-color: #eee;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  border-radius: 15px;
  margin: auto;
  text-align: justify;
  margin-top: 50px;
  padding: 10px 0;
  min-height: 400px;

  img {
    width: 300px;
  }
`;

export const Text = styled.div`
  height: 100%;
  width: 800px;
  font-size: 15px;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #111;
  padding: auto;
  margin-bottom: 10px;
  margin-top: 1%;
  li {
    &:first-child {
      margin-top: 10px;
    }
    display: flex;
    align-items: baseline;
    margin: 5px 0px;
    font-size: 10px;
    button {
      border-style: none;
      background-color: #322f40;
      padding: 5px 4px;
      border-radius: 3px;
      color: #eee;
      margin-right: 15px;
    }
  }
`;

export const TagForms = styled.form`
  display: flex;
  margin: 10px;
  input {
    border-style: none;
    padding-left: 5px;
    border-radius: 5px;
  }
  button {
    border-style: none;
    background-color: #322f40;
    padding: 5px 10px;
    border-radius: 3px;
    color: #eee;
    margin: 0 5px;
  }
`;
