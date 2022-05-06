import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmiFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}
  
  async execute(request: SubmiFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        '<div style="font-family: sans-serif; font-size: 1rem; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>'
      ].join('\n')
    })
  }
}