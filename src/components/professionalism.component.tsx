import Image from 'next/image';
import graphicTeach from '@/../public/info-pages/communication-graphics-teaching.png';
import graphicDoc from '@/../public/info-pages/writing-graphics-ids.png';
import graphicCollab from '@/../public/info-pages/writing-graphics-collab.png';
import graphicOneOnOne from '@/../public/info-pages/communication-one-on-one.png';

export default function ProfessionalInfo() {
    return (
        <section className="flex flex-col items-center gap-7 bg-white px-5 py-8 text-center text-base text-black sm:p-10 sm:text-xl">
            <h1 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Resume/ CV Building</h1>
            <div className="flex flex-col items-center">
              <Image src={graphicDoc} alt="Resume document illustration" className="size-32 max-w-full" />
              <Image src={graphicCollab} alt="Resume collaboration illustration" className="h-auto max-w-full" />
            </div>
            <p>We offer assistance with building and editing our members resumes and cover letters.<br/><br/>
            Having a strong resume and cover letter is crucial in earning your first internship/job.</p>
            <h2 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Professional & Leadership Workshops</h2>
            <p>SHE hosts at least one Professional and Leadership Workshops every month.<br/><br/></p>
            <Image src={graphicTeach} alt="Professional workshop illustration" className="size-60 max-w-full" />
            <p>In addition, we encourage our members to join committees within our Executive Board positions in order to gain professional and leadership experience.<br/>
            These experience are great resume builders and is an effective way in increasing participation within our club.</p>
            <h2 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Professional Advising</h2>
            <Image src={graphicOneOnOne} alt="One-on-one advising illustration" className="size-60 max-w-full" />
            <p>We have several experienced members and connections that are willing to give you
            honect advising base on their experience</p>
        </section>
    );
}
