```tsx
import { useState } from 'react';
import { CopyButton } from 'common/components/Button/CopyButton';

function Demo() {
  const [status, setStatus] = useState('Waiting...');
  const [text, setText] = useState('Enter text to copy...');

  return (
    <div>
      <p>{status}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <CopyButton
        copyText={text}
        onSuccess={() => setStatus('Successfully copied!')}
        onFailure={() => setStatus('Failed to copy!')}
      >
        Copy
      </CopyButton>
    </div>
  );
}

<Demo />;
```

Note that there is also a `ConnectedCopyButton` that is connected to our app's notification system via Redux.
The connected component is the default export of `CopyButton`, and does not have `onSuccess` or `onFailure` props.
