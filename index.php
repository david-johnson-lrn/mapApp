<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    include_once './sdk/src/LearnositySdk/autoload.php';

    use LearnositySdk\Request\Init;
    use LearnositySdk\Utils\Uuid;

    $session = Uuid::generate();

    $consumer_key = 'downloaddemo4o7M'; // Each signed client gets their own key and secret, in the meantime use the public demos key and secret shown here.
    $consumer_secret = '74c5fd430cf1242a527f6223aebd42d30464be22';

    $security = [
        'user_id' => 'DJ',
        'domain' => 'localhost',
        'consumer_key' => $consumer_key,
        'timestamp' => gmdate('Ymd-Hi')
    ];
    $request = [
        'id' => 'DJs Activity ID',
        'name' => 'DJs Activity Name',
        // 'type' => 'local_practice',
        // 'state' => 'initial'
        'session_id' => $session


    ];

    $init = new Init('questions', $security, $consumer_secret, $request)

    ?>


    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Assets/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Port 8008</title>

</head>

<body>
    <div style="position: relative;" class="question-container" id="map1">
        <span class="learnosity-response question-myMapApp">

        </span>
    </div>
    <br>
    <br>
    <h3 id="score"></h3>

    <script src="//questions.learnosity.com"></script>
    <script>
        var customQuestionJson = {
            "response_id": "myMapApp",
            "type": "custom",
            "js": "//<?php echo $_SERVER['HTTP_HOST'] ?>/Assets/customMap.js",
            "css": "//<?php echo $_SERVER['HTTP_HOST'] ?>/Assets/style.css",
            "stimulus": "<span></span> Where is Austin Texas??",
            "valid_response": "1005",
            "score": 1,
            "instant_feedback": true
        };

        let activity = <?php echo $init->generate() ?>

        activity.questions = [customQuestionJson];
        console.log(activity);
        const callbacks = {
            errorList: function(e) {
                console.log("error code", e.code)
                console.log("error message", e.msg)
                console.log("error detail", e.detail)
            },
            readyList: function(e) {
                console.log("ready, set, GO!")
            }
        }

        let questionsApp = window.questionsApp = LearnosityApp.init(activity, callbacks);
    </script>

</body>

</html>