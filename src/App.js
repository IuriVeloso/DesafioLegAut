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
      <small>
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
      </small>
      <ul>
        Tags
        {tag.map(t => (
          <li key={t.tagName}>{t.tagName}</li>
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
