/* eslint-disable object-curly-newline */
import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [newSelection, setNewSelection] = useState('');
  const [post, setPost] = useState([]);
  const [nextTag, setNextTag] = useState('');

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
      selected.anchorNode.nodeValue[selected.focusOffset - 1] !== ' '
      || selected.anchorNode.nodeValue[selected.focusOffset] !== '.'
    ) {
      for (
        let i = selected.focusOffset;
        selected.anchorNode.nodeValue[i] !== ' ';
        i += 1
      ) {
        selectionAfter += selected.anchorNode.nodeValue[i];
      }
    }
    if (
      selected.anchorNode.nodeValue[selected.anchorOffset] !== ' '
      || selected.anchorNode.nodeValue[selected.anchorOffset - 1] !== '.'
    ) {
      for (
        let i = selected.anchorOffset - 1;
        selected.anchorNode.nodeValue[i] !== ' ';
        i -= 1
      ) {
        selectionBefore = selected.anchorNode.nodeValue[i] + selectionBefore;
      }
    }

    const selection = selectionBefore + selected.toString() + selectionAfter;
    console.log(selected.anchorNode.nodeValue[selected.anchorOffset]);
    console.log(selection);
    setNewSelection(selection);
  };

  useEffect(() => {
    setPost([
      ...post,
      {
        tag: nextTag,
        note: newSelection
      }
    ]);
  }, [newSelection]);

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
      const index = post.findIndex(p => p.tag === t);
      if (index > 0) {
        return <h3>{post[index].note}</h3>;
      }
      return [];
    },
    [post]
  );

  return (
    <>
      <div
        onMouseUp={handleSelect}
        type="text"
        style={{ height: '100px', width: '800px', marginBottom: '50px' }}
        margin-bottom="50px"
        role="textbox"
        tabIndex="0"
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
