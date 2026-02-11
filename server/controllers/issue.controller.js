const {
    CreateIssueDTO,
    UpdateIssueDTO,
    ModifyIssueDTO,
    ErrorResDTO
} = require("../dtos/issue.dto");
const IssueService = require("../services/issue.service");

const IssueController = {
    createIssue: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });

            const { title, desc } = req.body

            const dto = CreateIssueDTO({ title, desc }, token);

            const result = await IssueService.CreateIssue(
                dto.data,
                dto.token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getmyissues: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });

            const result = await IssueService.getmyallissues(token, req)

            res.status(200).json(result)

        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getoneissue: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });
            const issueId = req.params.id

            const result = await IssueService.getoneissue(token, issueId)

            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updatemyissue: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });

            const { title, desc } = req.body
            const issueId = req.params.id

            const dto = UpdateIssueDTO({ issueId, title, desc }, token);

            const result = await IssueService.updateIssue(
                dto.data,
                dto.token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getallissues: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });

            const result = await IssueService.manageIssues(token, req)

            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    modifyissue: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json({ message: "Access denied" });

            const {
                severity,
                priority,
                status,
            } = req.body

            const issueId = req.params.id

            const dto = ModifyIssueDTO({issueId, severity, priority, status}, token)

            const result = await IssueService.modifyIssue(
                dto.data,
                dto.token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = IssueController;