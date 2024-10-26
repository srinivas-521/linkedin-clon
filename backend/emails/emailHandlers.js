import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {createCommentNotificationEmailTemplate, createConnectionAcceptedEmailTemplate, createWelcomeEmailTemplate } from "./emailTemplates.js"
export const sendwelcomeEmail= async (email,name,profileUrl)=>{
    const recipient= [{email}];

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Welcome to Connect",
            html:createWelcomeEmailTemplate(name,profileUrl),
            category:"welcome",

        });

        console.log("Welcome Email Was sent successfully", response);

    }catch(error){

        throw error;

    }



}

export  const sendCommentNotificationEmail= async( 
    recipientEmail,
    recipientName,
    commenterName,
    postUrl,
    CommentContent

)=>{
    const recipient=[ { email:recipientEmail } ]
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject: " Dude a new comment on your post",
            html:createCommentNotificationEmailTemplate(recipientName,
                commenterName,
                postUrl,
                CommentContent),
            category:"Comment_notification"

        })

        console.log("comment notification email was sent successfully", response);
    } catch (error) {
        throw(error)
        
    }
}

export const  sendConnectionAcceptedEmail= async(senderEmail, senderName, recipientName, profileUrl)=>{
    const recipient=[ { email:senderEmail }]
    try {
        const response= await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:`${recipientName} accepted your  connextion-request`,
            html:createConnectionAcceptedEmailTemplate(senderName, profileUrl),
            category:"Connection_accepted"

        })
    } catch (error) {

        console.error("error in sendConnectionAcceptedEmail",error);
    }
        
}