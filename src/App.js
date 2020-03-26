import React, { useState, useCallback, useEffect } from 'react';
import randomcolor from 'randomcolor';
import { Text, List, TagForms } from './styles.js';

function App() {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [post, setPost] = useState([]);
  const [nextTag, setNextTag] = useState('');
  const [tokenization, setTokenization] = useState([]);

  const deleteSpan = (passado, index) => {
    const newText = document.createTextNode(passado.firstChild.nodeValue);
    passado.parentNode.insertBefore(newText, passado);
    passado.parentNode.removeChild(passado);
    post.splice(index, 1);
  };

  const addRemover = useCallback(
    tagToAdd => {
      const index = post.findIndex(p => p.tagNote === tagToAdd);
      if (index >= 0) {
        const span = document.getElementById(post[index].token);
        span.addEventListener('click', () => deleteSpan(span, index), false);
        console.log('dentro');
      }
      console.log(post);
    },
    [post]
  );

  useEffect(() => {
    const text = document.getElementById('loremIpsum');
    const lastTag = nextTag;
    const contagem = post.filter(p => p.tagNote === lastTag);
    addRemover(lastTag);
    if (contagem.length > 1) {
      const index = post.findIndex(p => p.tagNote === nextTag);
      const span = document.getElementById(post[index].token);
      const newText = document.createTextNode(span.firstChild.nodeValue);
      text.insertBefore(newText, span);
      span.parentNode.removeChild(span);
      post.splice(index, 1);
    }
    setTokenization(() => text.innerText.split(' '));
    setNextTag('');
  }, [post]);

  useEffect(() => {
    const tagStorage = localStorage.getItem('tag');
    if (tagStorage) {
      setTag(JSON.parse(tagStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tag', JSON.stringify(tag));
  }, [tag]);

  const findName = useCallback(
    t => {
      const index = post.findIndex(p => p.tagNote === t);
      if (index >= 0) {
        return <h2>{post[index].token}</h2>;
      }
      return [];
    },
    [tokenization]
  );

  const handleSubmitNewTag = useCallback(
    e => {
      e.preventDefault();
      setTag([...tag, newTag]);
      setNewTag('');
    },
    [newTag, tag]
  );

  const handleSpanAdd = selection => {
    const tokenSelection = selection.split(' ');
    const text = document.getElementById('loremIpsum');
    const tokens = text.innerHTML.split(' ');
    let beforeSpan = '';
    let span = '';
    let afterSpan = '';
    let i = 0;

    for (; i < tokens.indexOf(tokenSelection[0]); i += 1) {
      beforeSpan = `${beforeSpan + tokens[i]} `;
    }

    for (
      ;
      i <= tokens.indexOf(tokenSelection[tokenSelection.length - 1]);
      i += 1
    ) {
      span = `${span + tokens[i]} `;
    }

    for (; i <= tokens.indexOf(tokens[tokens.length - 1]); i += 1) {
      afterSpan = `${afterSpan + tokens[i]} `;
    }
    const newHTML = document.createElement('SPAN');
    const newSpan = document.createTextNode(span);

    newHTML.setAttribute('id', selection);
    newHTML.appendChild(newSpan);
    newHTML.insertAdjacentHTML(
      'beforeend',
      `<small style="background: rgb(0,0,0,0.2)">${nextTag}</small>`
    );
    newHTML.style.cssText = `background: ${randomcolor()}`;
    const finalText = `${beforeSpan}${
      newHTML.outerHTML
    }${afterSpan.trimRight()}`;
    text.innerHTML = finalText;
  };

  const handleSelect = () => {
    let selected = null;
    let selectionAfter = '';
    let selectionBefore = '';

    if (window.getSelection()) {
      selected = window.getSelection();
    }
    if (document.selection) {
      selected = document.selection.createRange().text;
    }

    if (
      !/\s/g.test(selected.anchorNode.nodeValue[selected.focusOffset - 1]) &&
      !/\s/g.test(selected.anchorNode.nodeValue[selected.focusOffset])
    ) {
      for (
        let c = selected.focusOffset;
        selected.anchorNode.nodeValue[c] !== ' ' &&
        c <= selected.anchorNode.length - 1;
        c += 1
      ) {
        selectionAfter += selected.anchorNode.nodeValue[c];
      }
    }
    if (
      !/\s/g.test(selected.anchorNode.nodeValue[selected.anchorOffset]) &&
      !/\s/g.test(selected.anchorNode.nodeValue[selected.anchorOffset - 1])
    ) {
      for (
        let c = selected.anchorOffset - 1;
        selected.anchorNode.nodeValue[c] !== ' ' && c >= 0;
        c -= 1
      ) {
        selectionBefore = selected.anchorNode.nodeValue[c] + selectionBefore;
      }
    }

    const selection =
      selectionBefore + selected.toString().trim() + selectionAfter;
    setPost([
      ...post,
      {
        tagNote: nextTag,
        token: selection,
        postBegin: selected.anchorOffset,
        postEnd: selected.focusOffset
      }
    ]);
    handleSpanAdd(selection);
  };

  return (
    <>
      <Text
        onMouseUp={nextTag && handleSelect}
        type="text"
        role="textbox"
        tabIndex="0"
        id="loremIpsum"
        readOnly
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Donec ac odio tempor
        orci dapibus ultrices in iaculis. Sit amet nulla facilisi morbi tempus
        iaculis urna id volutpat. Quam viverra orci sagittis eu volutpat. Nisl
        suscipit adipiscing bibendum est ultricies integer quis auctor. Ac
        placerat vestibulum lectus mauris ultrices eros in. Justo eget magna
        fermentum iaculis eu non diam phasellus vestibulum. Odio morbi quis
        commodo odio aenean. At tempor commodo ullamcorper a lacus vestibulum
        sed. Ac turpis egestas maecenas pharetra. Nisi vitae suscipit tellus
        mauris a diam.
      </Text>

      <List>
        Tags
        {tag.map(t => (
          <li key={t}>
            <button type="button" onClick={() => setNextTag(t)}>
              {t}
            </button>
            {findName(t)}
          </li>
        ))}
      </List>
      <TagForms onSubmit={handleSubmitNewTag}>
        <input
          placeholder="Insira sua tag"
          name="tag"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
        />
        <button type="submit">Subir</button>
      </TagForms>
    </>
  );
}

export default App;
