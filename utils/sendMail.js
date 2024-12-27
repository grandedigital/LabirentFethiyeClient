import emailjs from "@emailjs/browser";

export async function SendMail(templateId, templateParams, publicKey = 'kmsc6KUwfTD0e3ajH', serviceId = 'service_hoy1hhc') {
    emailjs
        .send(
            serviceId,
            templateId,
            templateParams,
            publicKey
        )
        .then(
            (response) => {
                //console.log("SUCCESS!", response.status, response.text);
                return response
            },
            (err) => {
                return err
            }
        );
}