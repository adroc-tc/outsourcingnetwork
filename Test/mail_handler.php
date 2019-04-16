<?php 
	require 'C:/PHP/vendor/autoload.php'
	
	$mail= new PHPMailer();
	$mail->Host='smtp.gmail.com';
	$mail->SMTPAuth='true';
	$mail->Username='honhealthcareoutsourcing@gmail.com';
	$mail->Password='Tiucs1r7';
	$mail->SMTPSecure='tls';
	$mail->Port=587;
	
	$mail->SetFrom('Tester@example.com','Tester');
	$mail->addAddress('jkirsopp@gmail.com');
	$mail->addReplyTo('NoReply@gmail.com','Info');
	$mail->Subject='Test Subject';
	$mail->Body='Sample for testing';
	
	if($mail->send()) {
		echo'Mail Sent';
	}
	else {
		echo'Error: Mail NOT sent';
	}
    /* $to = "jkirsopp@healthout.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "Form submission (" . $_POST['subject'] . ")";
    $subject2 = "Copy of your form submission";
    $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $name . ", we will contact you shortly."; */
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
    }
?>