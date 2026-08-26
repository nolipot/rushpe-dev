export default function ProfessionalismInfo() {
    return (
        <section className="relative flex flex-col items-stretch bg-white px-5 py-8 text-center text-base text-black sm:p-10 sm:text-xl">
            <h1 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Scholarship Opportunity!</h1>
            <div className="mt-6">
                <p className="text-xs text-white">Put the fries in the bag</p>
                <p className="text-left text-lg font-semibold">MCDonald&apos;s HACER National Scholarship - </p>
                <p className="text-md">Awarded to 30 Hispanic students all over the country.<br/>Recipients are selected based on their academic achievement, community involvement, personal statement and financial need.
                    Must submit: <br/> <b>Transcript, Personal statement, Letter of recommendation to be submitted online, and  List of community service projects.</b></p>
            </div>
            <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:p-3 md:grid-cols-2">
                <div className="flex min-w-0 flex-col">
                    <h2 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Mentor/Mentee Program</h2>
                    <p>We offer our members an opportunity to take part in our Mentor/Mentee program.
                    In this program, we match our experienced upperclassmen with the younger class in order to aid in their scholarly, leadership and academic growth.<br/><br/>
                    In addition, this program is a great networking opportunity and a great place to make a friend within your field of studies.</p>
                </div>
                <div className="flex min-w-0 flex-col">
                    <h2 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Weekly Study Nights</h2>
                    <p>We offer our member weekly study nights, which is located at Richard Weeks.
                    We encourage you to take advantage of this opportunity and get studies in while bonding with our members.</p>
                </div>
                <div className="flex min-w-0 flex-col">
                    <h2 className="break-words text-3xl font-bold tracking-wide sm:text-4xl sm:tracking-wider">Academic Advice Programs</h2>
                    <p>Every month we host events that is strictly done to teach our members things that normally are not covered in class.<br/><br/>
                    Events such as our Financial Literacy Workshop and Professionalism Panel are crucial to the success of our members in the future.</p>
                </div>
            </div>
        </section>
    );
}
