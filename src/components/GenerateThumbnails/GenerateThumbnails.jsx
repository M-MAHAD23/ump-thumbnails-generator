// eslint-disable-next-line react/prop-types
function GenerateThumbnails({videoUrl}) {
    return (
        <>
            <video className="video" controls autoPlay muted key={videoUrl}>
                <source src={videoUrl} />
                Your browser does not support the video tag.
            </video>
        </>
    )
}

export default GenerateThumbnails