/* eslint-disable object-curly-newline */
import React, { useState, useCallback, useEffect } from 'react';
import randomcolor from 'randomcolor';

function App() {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [post, setPost] = useState([]);
  const [nextTag, setNextTag] = useState('');
  const [tokenization, setTokenization] = useState([]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setTag([...tag, newTag]);
      setNewTag('');
    },
    [newTag, tag]
  );

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
      !/\s/g.test(selected.anchorNode.nodeValue[selected.focusOffset - 1])
      && !/[.]/g.test(selected.anchorNode.nodeValue[selected.focusOffset - 1])
    ) {
      for (
        let c = selected.focusOffset;
        selected.anchorNode.nodeValue[c] !== ' ';
        c += 1
      ) {
        selectionAfter += selected.anchorNode.nodeValue[c];
      }
    }
    if (
      !/\s/g.test(selected.anchorNode.nodeValue[selected.anchorOffset])
      && !/[.]/g.test(selected.anchorNode.nodeValue[selected.anchorOffset])
    ) {
      for (
        let c = selected.anchorOffset - 1;
        selected.anchorNode.nodeValue[c] !== ' ';
        c -= 1
      ) {
        selectionBefore = selected.anchorNode.nodeValue[c] + selectionBefore;
      }
    }

    const selection = selectionBefore + selected.toString() + selectionAfter;
    setPost([
      {
        tagNote: nextTag,
        token: selection
      },
      ...post
    ]);
    setNextTag('');
    const tokenSelection = selection.split(' ');
    let beforeSpan = '';
    let span = '';
    let afterSpan = '';
    let i = 0;

    for (; i < tokenization.indexOf(tokenSelection[0]); i += 1) {
      beforeSpan = `${beforeSpan + tokenization[i]} `;
    }

    for (
      ;
      i <= tokenization.indexOf(tokenSelection[tokenSelection.length - 1]);
      i += 1
    ) {
      span = `${span + tokenization[i]} `;
    }

    for (
      ;
      i <= tokenization.indexOf(tokenization[tokenization.length - 1]);
      i += 1
    ) {
      afterSpan = `${afterSpan + tokenization[i]} `;
    }
    const newHTML = document.createElement('SPAN');
    const newSpan = document.createTextNode(span);
    newHTML.appendChild(newSpan);
    newHTML.style.cssText = `background: ${randomcolor()}`;
    document.getElementById(
      'loremIpsum'
    ).innerHTML = `${beforeSpan}${newHTML.outerHTML}${afterSpan}`;
  };

  useEffect(() => {
    setTokenization(() => document.getElementById('loremIpsum').innerHTML.split(' '));
  }, [post]);

  useEffect(() => {
    const tagStorage = localStorage.getItem('tag');
    if (tagStorage) {
      setTag(JSON.parse(tagStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tag', JSON.stringify(tag));
    console.log(tokenization);
  }, [tag]);

  const findName = useCallback(
    t => {
      const index = post.findIndex(p => p.tagNote === t);
      if (index >= 0) {
        return <h2>{post[index].token}</h2>;
      }
      return [];
    },
    [post]
  );

  return (
    <>
      <div
        onMouseUp={nextTag && handleSelect}
        type="text"
        style={{ height: '100px', width: '800px', marginBottom: '50px' }}
        margin-bottom="50px"
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
      </div>

      <ul>
        Tags
        {tag.map(t => (
          <li key={t}>
            <button type="button" onClick={() => setNextTag(t)}>
              {t}
            </button>
            {findName(t)}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Insira sua tag"
          name="tag"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
        />
        <button type="submit">Subir</button>
      </form>
    </>
  );
}

export default App;
