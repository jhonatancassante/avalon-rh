interface WaveTextProps {
    text: string;
}

const WaveText = ({ text }: WaveTextProps) => {
    return (
        <div className="flex">
            {text.split("").map((letter, index) => (
                <span
                    key={`${index} - ${letter}`}
                    className="inline-block animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {letter}
                </span>
            ))}
        </div>
    );
};

export default WaveText;
