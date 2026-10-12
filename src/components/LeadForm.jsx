import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { leadSchema, zodResolver } from '../lib/leadSchema.js';
import { submitLead } from '../lib/submitLead.js';
import FormField from './FormField.jsx';
import LeadFormSuccess from './LeadFormSuccess.jsx';
import NeedChoice from './NeedChoice.jsx';

const SUBMIT_LABELS = {
  download: 'Send me the download link',
  inquiry: 'Send my question',
};

export default function LeadForm({ defaultType, defaultProgram = '', idPrefix = 'lead' }) {
  const [submittedLead, setSubmittedLead] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: { type: defaultType, program: defaultProgram },
    shouldUnregister: true,
  });

  const type = useWatch({ control, name: 'type' });
  const fieldId = (name) => `${idPrefix}-${name}`;

  async function onSubmit(lead) {
    setSubmitError('');
    try {
      await submitLead(lead);
      setSubmittedLead(lead);
    } catch {
      setSubmitError("We couldn't send your request. Check your connection and try again.");
    }
  }

  function handleReset() {
    reset({ type: defaultType, program: defaultProgram });
    setSubmittedLead(null);
  }

  if (submittedLead) {
    return <LeadFormSuccess lead={submittedLead} onReset={handleReset} />;
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <NeedChoice registration={register('type')} error={errors.type?.message} />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id={fieldId('name')}
          label="Name"
          autoComplete="name"
          registration={register('name')}
          error={errors.name?.message}
        />
        <FormField
          id={fieldId('email')}
          label="Email"
          type="email"
          autoComplete="email"
          registration={register('email')}
          error={errors.email?.message}
        />
        <FormField
          id={fieldId('company')}
          label="Company"
          optional
          autoComplete="organization"
          registration={register('company')}
          error={errors.company?.message}
        />

        {type === 'download' && (
          <FormField
            id={fieldId('program')}
            label="Which program"
            optional
            hint="Leave blank if you're not sure."
            registration={register('program')}
            error={errors.program?.message}
          />
        )}
      </div>

      {type === 'inquiry' && (
        <>
          <FormField
            id={fieldId('message')}
            label="Your question"
            multiline
            registration={register('message')}
            error={errors.message?.message}
          />

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-gold">
              Project details <span className="normal-case tracking-normal text-ink-dim">(optional)</span>
            </legend>
            <div className="grid gap-6 sm:grid-cols-3">
              <FormField
                id={fieldId('projectType')}
                label="Building type"
                hint="For example: villa, office, warehouse."
                registration={register('projectType')}
                error={errors.projectType?.message}
              />
              <FormField
                id={fieldId('projectLocation')}
                label="Location"
                registration={register('projectLocation')}
                error={errors.projectLocation?.message}
              />
              <FormField
                id={fieldId('projectArea')}
                label="Floor area (m²)"
                inputMode="decimal"
                registration={register('projectArea')}
                error={errors.projectArea?.message}
              />
            </div>
          </fieldset>
        </>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-[2px] bg-amber px-6 py-3 font-semibold text-ground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : (SUBMIT_LABELS[type] ?? 'Send')}
        </button>
        <p className="text-sm text-ink-dim">
          See how we handle your details in our{' '}
          <Link
            to="/legal#privacy"
            className="text-gold underline underline-offset-4 transition-colors hover:text-gold-bright"
          >
            privacy notice
          </Link>
          .
        </p>
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-error">
          {submitError}
        </p>
      )}
    </form>
  );
}
