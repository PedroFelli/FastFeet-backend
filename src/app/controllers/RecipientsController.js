import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numero: Yup.number(),
      complemento: Yup.string(),
      nome: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number()
        .integer()
        .min(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    console.log(req.body);

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numero: Yup.number(),
      complemento: Yup.string(),
      nome: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number()
        .integer()
        .min(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.update(req.body);

    return res.json({
      recipient,
    });
  }

  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'nome',
        'rua',
        'numero',
        'complemento',
        'estado',
        'cidade',
        'cidade',
      ],
    });

    return res.json(recipients);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.destroy();

    return res.json({ mg: 'recipient destroy' });
  }

  async show(req, res) {
    const recipient = await Recipient.findOne({
      where: { id: req.params.id },
    });

    return res.json(recipient);
  }
}

export default new RecipientsController();
