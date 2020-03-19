import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setTag([...tag, { tagName: newTag, tagId: '' }]);
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
    for (
      let i = selected.focusOffset;
      selected.anchorNode.nodeValue[i] !== ' ';
      i += 1
    ) {
      selectionAfter += selected.anchorNode.nodeValue[i];
    }
    for (
      let i = selected.anchorOffset - 1;
      selected.anchorNode.nodeValue[i] !== ' ';
      i -= 1
    ) {
      selectionBefore = selected.anchorNode.nodeValue[i] + selectionBefore;
    }
    console.log(selectionBefore, selected.toString(), selectionAfter);
  };

  useEffect(() => {
    const tagStorage = localStorage.getItem('tag');

    if (tagStorage) {
      setTag(JSON.parse(tagStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tag', JSON.stringify(tag));
  }, [tag]);

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
          <button type="button" onClick={handleSelect} key={t.tagName}>
            {t.tagName}
          </button>
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
