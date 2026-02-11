exports.CreateIssueDTO = (data, token) => ({
    data: {
        title: String(data?.title || "").trim(),
        desc: String(data?.desc || "").trim()
    },
    token: String(token || "").trim()
});


exports.UpdateIssueDTO = (data, token) => ({
    data: {
        issueId: data?.issueId,
        title: String(data?.title || "").trim(),
        desc: String(data?.desc || "").trim()
    },
    token: String(token || "").trim()
});


exports.ModifyIssueDTO = (data, token) => ({
    data: {
        issueId: data?.issueId,
        severity: String(data?.severity || "").trim(),
        priority: String(data?.priority || "").trim(),
        status: String(data?.status || "").trim()
    },
    token: String(token || "").trim()
});


exports.CreateIssueResDTO = (message = "The Issue Created Successfully, Wait for Admin to Manage this") => ({
    success: true,
    message,
    timestamp: Date.now()
});

exports.GetAllMyIssuesResDTO = (result, message = "All My Issues are Fethed") => ({
    success: true,
    result,
    message,
    timestamp: Date.now()
});

exports.GetOneMyIssuesResDTO = (result, message = "One My Issues are Fethed") => ({
    success: true,
    result,
    message,
    timestamp: Date.now()
});

exports.GetAllIssuesResDTO = (result, message = "All Issues Fetched") => ({
    success: true,
    result,
    message,
    timestamp: Date.now()
});

exports.UpdateIssueResDTO = (message = "The Issue Updated Successfully") => ({
    success: true,
    message,
    timestamp: Date.now()
});

exports.ModifyResDTO = (message = "The Issue Modifid Successfully") => ({
    success: true,
    message,
    timestamp: Date.now()
});

exports.ErrorResDTO = (message = "Something went wrong", code = "SERVER_ERROR") => ({
    success: false,
    error: {
        code,
        message
    },
    timestamp: Date.now()
});