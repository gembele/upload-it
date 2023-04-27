import React, { useState, useEffect } from 'react';

export default function Post({ id, title, user, points}) {


  return (
    <div style={{ width: '100%', borderTop: '2px solid white' }}>
      <h3>{title}</h3>
      <p>User: {user}</p>
      <p>Points: {points}</p>
    </div>
  );
}
