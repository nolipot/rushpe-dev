'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DonationsUpdater() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const [ hasSubmitted, setSubmissionMessage ] = useState(false);
    const sendFormData = async (userInput: any) => {
        if (userInput.password != "nonchalant") {
            return;
        }
        try {
            await supabaseClient.from('DonationData').insert(
                {
                    amount: userInput.amountValue,
                    charity_id: userInput.charityId
                }
            );
        } catch (e: any) {
            console.log(e);
        }
        console.log(userInput);
        setSubmissionMessage(true);
        reset();
    }
    return (
        <>
            <section className="relative py-28 lg:px-72">
                <div className="relative bg-white text-black flex flex-col items-center p-5 gap-4 text-center">
                    <h3 className="text-4xl tracking-wide font-bold">Donations Updater</h3>
                    <form onSubmit={handleSubmit(sendFormData)} className="flex flex-col items-center my-2 gap-5 w-full lg:p-5">
                        <div className="flex flex-col sm:flex-row gap-5 w-full">
                            <input {...register('amountValue', { required: true, valueAsNumber: true, })} placeholder="Amount *"
                            className="p-3 w-full shadow-md rounded-lg"/>
                            <input {...register('charityId', { required: true, valueAsNumber: true, })} placeholder="Charity ID *"
                            className="p-3 w-full shadow-md rounded-lg"/>
                            <input {...register('password', { required: true, })} placeholder="Passcode :D *"
                            className="p-3 w-full shadow-md rounded-lg"/>
                        </div>
                        { (errors.amountValue) && <span>Please enter info</span> }
                        { (hasSubmitted) ? (<span>Submitted o.O!</span>) : (<></>) }
                        <input type="submit"
                        className="p-3 w-2/3 shadow-md rounded-lg bg-main text-white font-bold hover:bg-dark-main transition-colors"/>
                    </form>
                </div>
            </section>
        </>
    );
}