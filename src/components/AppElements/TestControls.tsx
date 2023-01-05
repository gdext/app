import Button from "@/components/Button";

type TestControlsProps = {
    keys: string[];
    onLevelFileLoad: (levelString: string) => void;
}

const TestControls = ({
    keys, onLevelFileLoad
}: TestControlsProps) => (

    <div className='controlDiv'>
        <h2>Upload the Level file:</h2>
        <input type="file" onChange={(e) => {
            const file = e.target.files?.item(0);
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    if (e.target?.result)
                        onLevelFileLoad(e.target.result.toString());
                };
                reader.readAsText(file);
            }
        }} />
        <p>
            Pressed keys: {keys.join(' + ')}
        </p>
        <div className="row">
            <Button text="Test Button"icon="settings"/>
            <Button text="Button Warning" variation='warning' />
            <Button text="Button Danger" variation='danger' />
            <Button text="Button Success" variation='success'/>
            <Button text="Button Secondary" variation='secondary' />
            <Button text="Button Dark" variation='dark' />
        </div>
        <div className="row" style={{ width: 830 }}>
            <Button
                text="OK"
                size='big'
                fullWidth
            />
            <Button
                text="Cancel"
                size='big'
                variation='secondary'
                fullWidth
            />
        </div>
        <div className="row">
            <Button disabled text="Test Button" icon="settings" />
            <Button disabled text="Button Warning" variation='warning' />
            <Button disabled text="Button Danger" variation='danger' />
            <Button disabled text="Button Success" variation='success' />
            <Button disabled text="Button Secondary" variation='secondary' />
            <Button disabled text="Button Dark" variation='dark' />
        </div>
    </div>

);

export default TestControls;